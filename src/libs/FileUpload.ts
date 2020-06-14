import axios from 'axios';

export function uploadImage(file: File | string[]): Promise<any> {
    return new Promise(resolve => {
        if (Array.isArray(file)) {
            debugger
            let axioss = file
                .filter(f => !f.startsWith("http"))
                .map(f => axios.request({
                        method: "post",
                        url: "https://api.imgbb.com/1/upload?key=a515ab146b1d928fb3d8fe86c10a076e",
                        data: {
                            image: (f.split(','))[1]
                        }
                    })
                );
            console.log(axioss);
        } else {
            debugger
            axios.post("https://api.imgbb.com/1/upload?key=a515ab146b1d928fb3d8fe86c10a076e", {
                image: file
            })
            resolve("https://random.dog/00186969-c51d-462b-948b-30a7e1735908.jpg");
        }
    })
}