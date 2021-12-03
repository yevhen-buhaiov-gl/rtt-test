import { FONT_FACE, FONT_FACE_ITEM, FONT_URL } from 'src/constants/ui';

export function getFonts(fonts: FONT_FACE[]): FONT_FACE_ITEM[] {
    return fonts.map((family: FONT_FACE): FONT_FACE_ITEM => ({ family, url: FONT_URL(family) }));
}

/**
 * Convert RGBA value to ARGB
 * @param {number} red Red color
 * @param {number} green Green color
 * @param {number} blue Blue color
 * @param {number} alpha Alpha
 */
export function argbColor(red: number, green: number, blue: number, alpha: number): number {
    const convertedAlpha = alpha > 0 && alpha <= 1 ? Math.ceil(alpha * 100 * 2.55) : 0;
    const a = convertedAlpha > 0 ? convertedAlpha.toString(16) : '00',
        r = red > 0 && red <= 255 ? red.toString(16) : '00',
        g = green > 0 && green <= 255 ? green.toString(16) : '00',
        b = blue > 0 && blue <= 255 ? blue.toString(16) : '00';
    return Number(`0x${a}${r}${g}${b}`);
}
