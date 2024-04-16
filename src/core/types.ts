import {ActionType} from "@settings/types";
import {KeyCollection} from "@core/RESTClient/interface";
import {UseListingHooks} from "@core/contextCollections/UseListing";
import {UseCreateEditModalHooks} from "@core/contextCollections/UseCreateEditModal";

export interface CRUDInterface<T> {
    Save(actionType: ActionType, client: T): Promise<T | undefined>;

    Validate(client: T): KeyCollection<T>;
}

export interface UseSettingsPage {
    hasFilter: boolean
    hasCRUD: boolean
}

export interface UseContextPage<T> {
    listing: UseListingHooks<T>;
    createEdit: UseCreateEditModalHooks<T>
    settingsPage: UseSettingsPage
}

export type DeepKeyOf<T> = T extends object
    //@ts-ignore
    ? keyof T | (T[keyof T] extends object ? `${keyof T}.${DeepKeyOf<T[keyof T]>}` : never)
    : never;