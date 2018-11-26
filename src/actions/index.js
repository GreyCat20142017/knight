
export const CLICK_CELL = 'CLICK_CELL';
export const START = 'START';

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


