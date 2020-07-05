import axios from 'axios';

export function uploadImage(file: File | string[]): Promise<any> {
    return new Promise(async resolve => {
        if (Array.isArray(file)) {
            let axiosList = file
                .map(f => {
                        if (!f.startsWith("http")) {
                            let body = new FormData();
                            body.set("image", (f.split(','))[1]);
                            return axios.request({
                                method: "post",
                                url: "https://api.imgbb.com/1/upload?key=a515ab146b1d928fb3d8fe86c10a076e",
                                data: body
                            })
                        } else {
                            return new Promise(resolve => resolve(f));
                        }
                    }
                );
            resolve((await Promise.all(axiosList)).map(img => {
                if (typeof img === "string") {
                    return img
                } else {
                    // @ts-ignore
                    return img.data.data.display_url;
                }
            }));
        } else {
            let base64 = await new Promise(resolve => {
                let reader = new FileReader();
                reader.onload = (e) => {
                    resolve(e.target?.result as any);
                }
                reader.readAsDataURL(file);
            }) as string;
            let body = new FormData();
            body.set("image", (base64.split(','))[1]);
            resolve(
                (await axios.request({
                    method: "post",
                    url: "https://api.imgbb.com/1/upload?key=a515ab146b1d928fb3d8fe86c10a076e",
                    data: body
                })).data.data.display_url
            );
        }
    })
}