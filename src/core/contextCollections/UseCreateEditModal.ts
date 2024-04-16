import { KeyCollection } from '@core/RESTClient/interface';
import { StateInterface, StateType, createState } from '@core/RXContextCore/useContextSubscriber';
import { CRUDInterface, DeepKeyOf } from '@core/types';
import { ActionType } from '@settings/types';

interface SettingsContext {
  onSuccess: () => void;
}

interface Actions<T> {
  handleClearError(key: DeepKeyOf<T>): void;

  handleSave(): Promise<void>;

  handleOpenCreateItem(onSuccess: () => void): void;

  handleOpenModalWithCurrentItem(item: T, onSuccess: () => void): void;
}

export interface UseCreateEditModalHooks<T> {
  useIsOpen(): StateInterface<boolean>;

  useCurrentItem(): StateInterface<T>;

  useActionsType(): StateInterface<ActionType>;

  useIsLoading(): StateInterface<boolean>;

  useErrors(): StateInterface<KeyCollection<T>>;

  actions: Actions<T>;
}

const settingsContext: SettingsContext = {
  onSuccess: () => null,
};

class UseCreateEditModal<T> {
  isOpen: StateType<boolean>;
  actionsType: StateType<ActionType>;
  isLoading: StateType<boolean>;
  errors: StateType<KeyCollection<T>>;
  currentItem: StateType<T | undefined>;
  settings: StateType<SettingsContext>;
  private readonly templateItem: T;
  private collector: CRUDInterface<T>;

  constructor(context: string, templateItem: T, collector: CRUDInterface<T>) {
    this.isOpen = createState<boolean>(false);
    this.actionsType = createState<ActionType>('create');
    this.isLoading = createState<boolean>(false);
    this.errors = createState<KeyCollection<T>>({});
    this.currentItem = createState<T | undefined>(undefined);
    this.settings = createState<SettingsContext>(settingsContext);
    this.templateItem = templateItem;
    this.collector = collector;
  }

  handleOpenCreateItem = (onSuccess: () => void) => {
    this.settings[1].next({ onSuccess });
    this.currentItem[1].next({ ...this.templateItem, id: 'temp' });
    this.actionsType[1].next('create');
    this.isOpen[1].next(true);
  };

  handleOpenModalWithCurrentItem = (item: T, onSuccess: () => void) => {
    this.settings[1].next({ onSuccess });
    this.currentItem[1].next(item);
    this.actionsType[1].next('edit');
    this.isOpen[1].next(true);
  };

  handleSave = async () => {
    const actionType = this.actionsType[1].getValue();
    const item = this.currentItem[1].getValue();
    const errors = this.collector.Validate(item);

    if (Object.keys(errors).length !== 0) {
      this.errors[1].next(errors);
      return;
    }

    this.isLoading[1].next(true);
    await this.collector.Save(actionType, item).then(() => {
      this.settings[1].getValue().onSuccess();
      this.isLoading[1].next(false);
    });
  };

  handleClearError = (key: keyof T) => {
    const errors = this.errors[1].getValue();
    delete errors[key];
    this.errors[1].next(errors);
  };

  get hooks(): UseCreateEditModalHooks<T> {
    return {
      useIsOpen: this.isOpen[0],
      useCurrentItem: this.currentItem[0],
      useActionsType: this.actionsType[0],
      useIsLoading: this.isLoading[0],
      useErrors: this.errors[0],
      actions: {
        handleClearError: this.handleClearError.bind(this),
        handleSave: this.handleSave.bind(this),
        handleOpenCreateItem: this.handleOpenCreateItem.bind(this),
        handleOpenModalWithCurrentItem: this.handleOpenModalWithCurrentItem.bind(this),
      },
    };
  }
}

export default UseCreateEditModal;
