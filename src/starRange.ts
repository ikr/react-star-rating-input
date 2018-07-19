export default function (size: number): number[] {
    const result = new Array(size)

    for (let i = 0; i < size; i++) {
        result[i] = i + 1
    }

    return result
}
