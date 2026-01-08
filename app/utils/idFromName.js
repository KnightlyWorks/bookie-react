export default function idFromName (labelText) {
    return labelText.replace(/\s+/g, '-').toLowerCase();
}