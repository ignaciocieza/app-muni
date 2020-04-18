import Jimp from 'jimp';

/**
 * Compresor de imagen y genera formato para la base de datos
 * @param {*} img 
 */
export const imageToBuffer = async (img) => {
    let avatar, resp;
    // console.dir(img)
    try {
        avatar = await Jimp.read(img);
        avatar.resize(200, Jimp.AUTO);
        avatar.quality(80);
        // await avatar.getBufferAsync(Jimp.MIME_JPEG);
        resp = await avatar.getBase64Async(Jimp.MIME_JPEG);
        // formData = new FormData();
        // formData.append('file', resp);
        // formData.append('dni', '34330373');
        // console.dir(formData)
        return resp;
    } catch (err) {
        console.error(err);
    }
};

/**
 * Genera  imagen desde el formato buffer
 * @param {*} buffer 
 */
export const bufferToImage = (img) => {
    const { data } = img ? img : 'nodata';
    // const b64encoded = btoa(String.fromCharCode.apply(null, data));
    // const aux = `data:image/jpeg;base64,${b64encoded}`;
    // return aux;  
    const enc = new TextDecoder("utf-8");
    const arr = new Uint8Array(data);
    return enc.decode(arr);
};






