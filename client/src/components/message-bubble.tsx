interface MessageBubbleProps {
  text: string;
  user: string;
  time: string;
}

export const MessageBubble = ({ text, user, time }: MessageBubbleProps) => {
  return (
    <div className="flex justify-end px-4">
      <div className="relative z-10 bg-[#005c4b] text-white rounded-xl px-4 py-2 shadow-md">
        <div className="text-green-400 text-sm font-bold drop-shadow-md">{user}</div>

        <div className="whitespace-pre-wrap break-all text-md">{text}</div>

        <div className="text-xs text-gray-300 text-right">{time}</div>
      </div>
    </div>
  );
};
