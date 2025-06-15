import { useRef, useState } from 'react';
import { PaperPlaneRight } from 'phosphor-react';

interface EditorProps {
  onSend: (text: string) => void;
}

export const Editor = ({ onSend }: EditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [hasText, setHasText] = useState(false);

  function updateEmptyState(el: HTMLElement) {
    const text = el.textContent?.replace(/\u00A0/g, '').trim() || '';
    const empty = text.length === 0;
    el.setAttribute('data-empty', empty.toString());
    setHasText(!empty);
  }

  function resetEditor() {
    const editor = editorRef.current;
    if (!editor) return;

    editor.innerHTML = '<p><br></p>';
    setHasText(false);
    editor.setAttribute('data-empty', 'true');
    placeCaretAtEnd(editor);
  }

  function handleInput(e: React.FormEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    updateEmptyState(el);

    if (el.getAttribute('data-empty') === 'true') {
      resetEditor();
    }

    scrollCaretIntoView(el);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const editor = editorRef.current;
    if (!editor) return;

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
      return;
    }

    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      insertLineBreak();
      updateEmptyState(editor);
    }
  }

  function handleSubmit() {
    const editor = editorRef.current;
    if (!editor) return;

    const raw = editor.innerHTML;
    const text = parseHtmlToPlainText(raw);

    if (!text.replace(/\n/g, '').trim()) return;

    onSend(text);
    resetEditor();
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex items-center gap-2 w-[600px] mx-auto">
      <div
        ref={editorRef}
        contentEditable
        role="textbox"
        aria-multiline="true"
        data-placeholder="Digite uma mensagem"
        data-empty="true"
        spellCheck={true}
        suppressContentEditableWarning
        className="editor-placeholder relative flex-1 min-h-[40px] max-h-40 overflow-auto rounded-lg px-4 py-2 bg-[#2a3942] text-white text-base focus:outline-none leading-normal whitespace-pre-wrap break-words"
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        style={{ caretColor: '#94a3b8', outline: 'none' }}>
        <p>
          <br />
        </p>
      </div>

      <button
        type="submit"
        aria-label="Enviar mensagem"
        className={`p-3 rounded-lg text-white flex items-center justify-center transition-colors duration-100 ${
          hasText ? 'bg-transparent cursor-pointer' : 'bg-transparent cursor-not-allowed opacity-50'
        }`}
        disabled={!hasText}>
        <PaperPlaneRight size={24} weight="bold" />
      </button>

      <style>{`
        .editor-placeholder[data-empty="true"]::before {
          content: attr(data-placeholder);
          position: absolute;
          top: 50%;
          left: 1rem;
          transform: translateY(-50%);
          color: #94a3b8;
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
        }

        .editor-placeholder[data-empty="true"]:focus::before {
          display: none;
        }
      `}</style>
    </form>
  );
};

function insertLineBreak() {
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) return;

  const range = sel.getRangeAt(0);
  range.deleteContents();

  const br = document.createElement('br');
  range.insertNode(br);

  const textNode = document.createTextNode('');
  br.parentNode?.insertBefore(textNode, br.nextSibling);

  range.setStart(textNode, 0);
  range.collapse(true);

  sel.removeAllRanges();
  sel.addRange(range);
}

// function placeCaretAtEnd(el: HTMLElement) {
//   el.focus();
//   const sel = window.getSelection();
//   if (!sel) return;

//   sel.removeAllRanges();

//   let node: Node | null = el;
//   while (node && node.lastChild) {
//     node = node.lastChild;
//   }
//   if (!node) return;

//   const range = document.createRange();

//   if (node.nodeName === 'BR') {
//     range.setStart(el, el.childNodes.length - 1);
//   } else if (node.nodeType === Node.TEXT_NODE) {
//     range.setStart(node, node.textContent?.length ?? 0);
//   } else {
//     range.setStartAfter(node);
//   }

//   range.collapse(true);
//   sel.addRange(range);
// }

function scrollCaretIntoView(el: HTMLElement) {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;

  const range = sel.getRangeAt(0).cloneRange();

  // Coloca range numa posição "visível" e sem conteúdo
  range.collapse(true);

  // Obtem o retângulo da caret
  const rects = range.getClientRects();
  if (rects.length === 0) return;

  const rect = rects[0];
  const elRect = el.getBoundingClientRect();

  // Calcula a posição da caret relativa ao container
  const caretRelativeY = rect.top - elRect.top + el.scrollTop;

  // Se caret está fora da área visível (embaixo)
  if (caretRelativeY > el.scrollTop + el.clientHeight) {
    el.scrollTop = caretRelativeY - el.clientHeight + 5; // 5px padding
  }

  // Se caret está fora da área visível (em cima)
  if (caretRelativeY < el.scrollTop) {
    el.scrollTop = caretRelativeY - 5; // 5px padding
  }
}

function placeCaretAtEnd(el: HTMLElement) {
  el.focus();
  const sel = window.getSelection();
  if (!sel) return;

  sel.removeAllRanges();

  const range = document.createRange();

  if (el.lastChild) {
    if (el.lastChild.nodeType === Node.TEXT_NODE) {
      range.setStart(el.lastChild, el.lastChild.textContent?.length ?? 0);
    } else {
      range.setStartAfter(el.lastChild);
    }
  } else {
    range.setStart(el, 0);
  }

  range.collapse(true);
  sel.addRange(range);
}

function parseHtmlToPlainText(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p><p>/gi, '\n')
    .replace(/<\/?p>/gi, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/\u200B/g, '');
}
