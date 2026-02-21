import { GET_EXPERIENCES_GALLERY } from "./ApiUrls";

export const fetchExpeienceGallery = async () => {
    let URL = GET_EXPERIENCES_GALLERY;
    try {
        const res = await fetch(URL, {
            method: 'GET',
        })
        const data = await res.json();
        console.log('>>>data', data);
        return data;
    } catch (err: any) {
        console.log('>>>Err', err);
        throw new Error(err);
    }
};