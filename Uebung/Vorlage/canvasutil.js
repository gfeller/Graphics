class CanvasUtil  {
    static getColorAt(context, x, y) {
        let imgd = context.getImageData(x, y, 1, 1);
        let pix = imgd.data;
        return pix;
    }
}


