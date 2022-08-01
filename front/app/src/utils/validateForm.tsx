export function isFormDataValid(firstName: string, lastName: string, participation: string) {
    return (
        (firstName !== undefined) && (lastName !== undefined)
        && (participation !== undefined) && (isStringPositiveInteger(participation))
    );
}

function isStringPositiveInteger (str : string ) {
    const num : Number = Number(str)

    return Number.isInteger(num) && num > 0
}