
export function startLoad() {
    return {type: 'REQUEST_STARTED'};
}

export function finishLoad() {
    return {type: 'REQUEST_COMPLETE'};
}
