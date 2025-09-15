const timeFormat = (Minutes) => {
    const hours = Math.floor(Minutes / 60);
    const minutes = Minutes % 60;
    return `${hours}h ${minutes}min`;
};

export default timeFormat;