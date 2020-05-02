export function uploadImage(file: File): Promise<string> {
    console.log('called');
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('resolved');
            resolve("https://random.dog/00186969-c51d-462b-948b-30a7e1735908.jpg");
        }, 800)
    })
}