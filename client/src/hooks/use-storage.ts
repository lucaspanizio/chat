const STORAGE_KEYS = {
  TOKEN: '@chat:token',
  USER: '@chat:user',
};

type ValueTypeByKey = {
  TOKEN: string;
  USER: {
    name: string;
    username: string;
  };
};

type StorageType = 'local' | 'session';
type StorageKey = keyof ValueTypeByKey;
type StorageValue<K extends StorageKey> = ValueTypeByKey[K];

type GetStorageArgs<K extends StorageKey> = {
  type: StorageType;
  key: K;
  defaultValue?: StorageValue<K>;
};

type SetStorageArgs<K extends StorageKey> = {
  type: StorageType;
  key: K;
  value: StorageValue<K>;
};

type ClearStorageArgs = { type: 'local' | 'session'; key: StorageKey } | undefined;

export function useStorage<K extends StorageKey>() {
  function getStorage<K extends StorageKey>(
    args: GetStorageArgs<K> & { defaultValue: StorageValue<K> },
  ): StorageValue<K>;

  function getStorage<K extends StorageKey>(args: GetStorageArgs<K>): StorageValue<K> | null;

  function getStorage<K extends StorageKey>({
    key,
    type,
    defaultValue,
  }: GetStorageArgs<K>): StorageValue<K> | null {
    const store = type === 'local' ? localStorage : sessionStorage;
    const storageKey = STORAGE_KEYS[key];

    const raw = store.getItem(storageKey);
    if (!raw) return defaultValue ?? null;
    try {
      return JSON.parse(raw) as StorageValue<K>;
    } catch {
      return defaultValue ?? null;
    }
  }

  const setStorage = ({ type, key, value }: SetStorageArgs<K>) => {
    const store = type === 'local' ? localStorage : sessionStorage;
    const storageKey = STORAGE_KEYS[key];

    store.setItem(storageKey, JSON.stringify(value));
  };

  const clearStorage = (args?: ClearStorageArgs) => {
    if (!args) {
      localStorage.clear();
      sessionStorage.clear();
      return;
    }

    const store = args.type === 'local' ? localStorage : sessionStorage;
    const storageKey = STORAGE_KEYS[args.key];

    store.removeItem(storageKey);
  };

  return { getStorage, setStorage, clearStorage } as const;
}
