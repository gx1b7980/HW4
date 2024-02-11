import axios from 'axios';

interface authorList{
    id: number;
    a_name: string;
    bio: string;
}

interface bookList{
    id: number;
    author_id: number;
    title: string;
    pub_year: number;
    genre: string;
}

function ensureError(value: unknown): Error {
    if (value instanceof Error) return value;

    let stringified;
    try {
        stringified = JSON.stringify(value);
    } catch {
        stringified = "[Unable to stringify the thrown value]";
    }

    let error = new Error(
        `Thrown value was originally not an error; stringified value is: ${stringified}`
    );
    return error;
}

// http://axios-http.com/docs/handling_errors
// http://github.com/axios/axios/issues/3612
function getAxiosErrorMessages(err: unknown): string[] {
    let error = ensureError(err);
    console.log(error);

    if (!axios.isAxiosError(error)) {
        return [error.toString()];
    }

    if (!error.response) {
        return ["Server never sent response"];
    }

    // TODO assumes API's body will be { error: <string>[] } if error
    if (!error.response.data?.errors) {
        return [error.message];
    }

    return error.response.data.errors;
}

export type { authorList, bookList };
export { ensureError, getAxiosErrorMessages };
