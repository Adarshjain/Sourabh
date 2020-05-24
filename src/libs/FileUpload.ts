export function uploadImage(file: File | string[]): Promise<any> {
    return new Promise(resolve => {
        setTimeout(() => {
            if (Array.isArray(file)) {
                resolve(file);
            } else {
                resolve("https://random.dog/00186969-c51d-462b-948b-30a7e1735908.jpg");
            }
        }, 800)
    })
}