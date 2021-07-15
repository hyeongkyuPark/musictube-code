const deviceSizes = {
    tablet: '768px',
    laptop: '1024px',
    pc: '1300px',
}

const device = {
    tablet: `screen and (min-width: ${deviceSizes.tablet})`,
    laptop: `screen and (min-width: ${deviceSizes.laptop})`,
    pc: `screen and (min-width: ${deviceSizes.pc})`,
}

const theme = {
    device
}

export default theme;