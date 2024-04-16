import { ListResponse } from '@core/RESTClient/interface';
import { StateInterface, StateType, createState } from '@core/RXContextCore/useContextSubscriber';
import { Subscription, combineLatest } from 'rxjs';
import { debounceTime, filter, switchMap } from 'rxjs/operators';

export interface ListParams {
  limit?: number;
  offset?: number;
}

export type RequiredGetParams = Required<ListParams>;

interface Actions {
  init(): void;
  unsubscribe(): void;
}

export interface UseListingHooks<T> {
  useParams(): StateInterface<ListParams>;

  useCount(): StateInterface<number>;

  useList(): StateInterface<T[]>;

  useLoading(): StateInterface<boolean>;

  useInit(): StateInterface<boolean>;

  actions: Actions;
}

export const TEMPLATE_PARAMS: RequiredGetParams = {
  limit: 10,
  offset: 0,
};

class UseListing<T> {
  private readonly subscription: Subscription | null = null;
  private readonly loaderData: (p: ListParams) => Promise<ListResponse<T>>;
  useParams: StateType<ListParams>;
  useInit: StateType<boolean>;
  useList: StateType<T[]>;
  useCount: StateType<number>;
  useLoading: StateType<boolean>;

  constructor(context: string, loader: (p: ListParams) => Promise<ListResponse<T>>) {
    this.useParams = createState<ListParams>(TEMPLATE_PARAMS, `PARAMS_${context}`);
    this.useInit = createState<boolean>(false);
    this.useList = createState<T[]>([], `ITEMS_${context}`);
    this.useLoading = createState<boolean>(false);
    this.useCount = createState<number>(0);
    this.loaderData = loader;

    this.subscription = combineLatest([this.useInit[1], this.useParams[1]])
      .pipe(
        debounceTime(500),
        filter(([_, params]) => !!params),
        switchMap(([_, params]) => this.loadItems(params))
      )
      .subscribe((res) => {
        this.useList[1].next(res.result);
        this.useCount[1].next(res.count);
        this.useLoading[1].next(false);
      });
  }

  private async loadItems(params: ListParams): Promise<ListResponse<T>> {
    this.useLoading[1].next(true);
    return this.loaderData(params);
  }

  // Метод для отписки
  unsubscribe() {
    if (this.subscription) {
      this.useList[2]('clearWithLocalStore');
      this.useParams[2]('clearWithLocalStore');
      this.useCount[2]();
      this.useLoading[2]();
    }
  }

  initHandle = (): void => {
    this.useInit[1].next(true);
  };

  get hooks(): UseListingHooks<T> {
    return {
      useParams: this.useParams[0],
      useInit: this.useInit[0],
      useCount: this.useCount[0],
      useList: this.useList[0],
      useLoading: this.useLoading[0],
      actions: {
        init: this.initHandle.bind(this),
        unsubscribe: this.unsubscribe.bind(this),
      },
    };
  }
}

export default UseListing;
