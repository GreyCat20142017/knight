export const CLICK_CELL = 'CLICK_CELL';
export const START = 'START';

export const CLICK_DISABLED_CELL = 'CLICK_DISABLED_CELL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const SHOW_MODAL = 'SHOW_MODAL';

export const onCellClick = (id) => {
    return {
        type: CLICK_CELL,
        id: id
    };
}

export const onStart = () => {
    return {
        type: START
    };
}

export const onDisabledClick = (id) => {
    return {
        type: CLICK_DISABLED_CELL,
        id: id
    };
}

export const onModalCancel = () => {
    return {
        type: CLOSE_MODAL
    };
}

export const onModalShow = () => {
    return {
        type: SHOW_MODAL
    };
}
