export enum appActionType {
  OPEN_SIDEBAR = "OPEN_SIDEBAR",
  CLOSE_SIDEBAR = "CLOSE_SIDEBAR",
}

export interface OpenSideBarI {
  type: appActionType.OPEN_SIDEBAR;
}

export interface CloseSideBarI {
  type: appActionType.CLOSE_SIDEBAR;
}

export const openSideBar = (): OpenSideBarI => ({
    type: appActionType.OPEN_SIDEBAR,
});

export const closeSideBar = (): CloseSideBarI => ({
    type: appActionType.CLOSE_SIDEBAR,
});

export type AppAction = OpenSideBarI | CloseSideBarI;
