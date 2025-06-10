import { useCallback, useState } from 'react';

type Field<T = string> = {
  value: T;
  error?: string;
};

type HandleSubmitFn<T> = (
  onValid: (data: T) => void,
  onInvalid?: () => void,
) => (e: React.FormEvent) => void;

type FormState = {
  username: Field<string>;
  password: Field<string>;
};

type FormData = {
  username: string;
  password: string;
};

type FormErrors = Partial<Record<keyof FormData, string>> & { _server?: string };

export function useFormLogin() {
  const [serverError, setServerError] = useState<string | undefined>(undefined);

  const [form, setForm] = useState<FormState>({
    username: { value: '' },
    password: { value: '' },
  });

  const values: FormData = {
    username: form.username.value,
    password: form.password.value,
  };

  const errors: FormErrors = {
    username: form.username.error,
    password: form.password.error,
    ...(serverError && { _server: serverError }),
  };

  const setValue = useCallback((field: keyof FormState, value: string) => {
    setForm((f) => ({
      ...f,
      [field]: { value, error: undefined },
    }));
    setServerError(undefined);
  }, []);

  const setError = useCallback((field: keyof FormData | '_server', message: string) => {
    if (field === '_server') {
      setServerError(message);
    } else {
      setForm((prev) => ({
        ...prev,
        [field]: { ...prev[field], error: message },
      }));
    }
  }, []);

  const validate = useCallback(() => {
    const errors: Partial<Record<keyof FormData, string>> = {};
    if (!form.username.value.trim()) errors.username = 'Informe o usuário';
    if (!form.password.value.trim()) errors.password = 'Informe a senha';

    setForm((prev) => ({
      username: { value: prev.username.value, error: errors.username },
      password: { value: prev.password.value, error: errors.password },
    }));

    return Object.keys(errors).length === 0;
  }, [form]);

  const register = useCallback(
    (field: keyof FormData) => ({
      name: field,
      value: form[field].value,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(field, e.target.value),
      placeholder: form[field].error ?? '',
    }),
    [form, setValue],
  );

  const handleSubmit: HandleSubmitFn<FormData> = useCallback(
    (onValid, onInvalid) => (e) => {
      e.preventDefault();
      setServerError(undefined);
      const isValid = validate();
      if (isValid) {
        onValid(values);
        return;
      }
      onInvalid?.();
    },
    [validate, values],
  );

  return { errors, setError, register, handleSubmit };
}
