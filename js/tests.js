const {
    core: {describe, it, expect, run},
    prettify,
} = window.jestLite;


describe('Examples', () => {
    it('RENE example', () => {
        const text = 'RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00';
        const result = getAmountByText(text);
        expect(result.amount).toBe(215);
        expect(result.name).toBe('RENE');
        expect(result.error).toBe(false);
    });
    it('ASTRID example', () => {
        const text = 'ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00';
        const result = getAmountByText(text);
        expect(result.amount).toBe(85);
        expect(result.name).toBe('ASTRID');
        expect(result.error).toBe(false);
    });
});


describe('Data format', () => {
    it('Any random text', () => {
        const text = 'fjsjfksudfhsefsdjkfjksd';

        const result = getAmountByText(text);
        expect(result.amount).toBe(0);
        expect(result.name).toBe('Unknown');
        expect(result.error).toBe(true);
    });
    it('ASTRID empty', () => {
        const text = 'ASTRID=';
        const result = getAmountByText(text);
        expect(result.amount).toBe(0);
        expect(result.name).toBe('ASTRID');
        expect(result.error).toBe(true);
    });
    it('There is no equal sign', () => {
        const text = 'ASTRIDMO10:00-12:00,TH12:00-14:00,SU20:00-21:00';
        const result = getAmountByText(text);
        expect(result.amount).toBe(0);
        expect(result.name).toBe('Unknown');
        expect(result.error).toBe(true);
    });
    it('Two equal signs', () => {
        const text = 'ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00=ASTRID';
        const result = getAmountByText(text);
        expect(result.amount).toBe(0);
        expect(result.name).toBe('Unknown');
        expect(result.error).toBe(true);
    });
    it('Two equal signs', () => {
        const text = 'ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00=ASTRID';
        const result = getAmountByText(text);
        expect(result.amount).toBe(0);
        expect(result.name).toBe('Unknown');
        expect(result.error).toBe(true);
    });
    it('Last day code is not a valid value', () => {
        const text = 'ASTRID=MO10:00-12:00,TH12:00-14:00,SI20:00-21:00';
        const result = getAmountByText(text);
        expect(result.amount).toBe(60);
        expect(result.name).toBe('ASTRID');
        expect(result.error).toBe(true);
    });
    it('Last time range invalid', () => {
        const text = 'ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00-22:00';
        const result = getAmountByText(text);
        expect(result.amount).toBe(60);
        expect(result.name).toBe('ASTRID');
        expect(result.error).toBe(true);
    });
    it('Last end time invalidated with seconds', () => {
        const text = 'ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00:00';
        const result = getAmountByText(text);
        expect(result.amount).toBe(60);
        expect(result.name).toBe('ASTRID');
        expect(result.error).toBe(true);
    });
    it('Last end time invalidated with letters', () => {
        const text = 'ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:XX';
        const result = getAmountByText(text);
        expect(result.amount).toBe(60);
        expect(result.name).toBe('ASTRID');
        expect(result.error).toBe(true);
    });
    it('Last end time invalidated with negative number', () => {
        const text = 'ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:-4';
        const result = getAmountByText(text);
        expect(result.amount).toBe(60);
        expect(result.name).toBe('ASTRID');
        expect(result.error).toBe(true);
    });
    it('Last end time invalidated with decimal', () => {
        const text = 'ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:12.2';
        const result = getAmountByText(text);
        expect(result.amount).toBe(60);
        expect(result.name).toBe('ASTRID');
        expect(result.error).toBe(true);
    });
    it('Last end time invalidated with minutes over 60', () => {
        const text = 'ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:88';
        const result = getAmountByText(text);
        expect(result.amount).toBe(60);
        expect(result.name).toBe('ASTRID');
        expect(result.error).toBe(true);
    });
    it('Last end time invalidated with hours over 24', () => {
        const text = 'ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-25:00';
        const result = getAmountByText(text);
        expect(result.amount).toBe(60);
        expect(result.name).toBe('ASTRID');
        expect(result.error).toBe(true);
    });
    it('Last time invalidated with end time before start time', () => {
        const text = 'ASTRID=MO10:00-12:00,TH12:00-14:00,SU22:00-20:00';
        const result = getAmountByText(text);
        expect(result.amount).toBe(60);
        expect(result.name).toBe('ASTRID');
        expect(result.error).toBe(true);
    });
});


describe('Pays', () => {
    it('1 hour in Monday before 9:00', () => {
        const dayOfWeek='MO', startMinutes=60, endMinutes=120;
        const result = getPayByTime(dayOfWeek, startMinutes, endMinutes);
        expect(result).toBe(25);
    });
    it('1 hour in Monday before 18:00', () => {
        const dayOfWeek='MO', startMinutes=600, endMinutes=660;
        const result = getPayByTime(dayOfWeek, startMinutes, endMinutes);
        expect(result).toBe(15);
    });
    it('1 hour in Monday before 00:00', () => {
        const dayOfWeek='MO', startMinutes=1200, endMinutes=1260;
        const result = getPayByTime(dayOfWeek, startMinutes, endMinutes);
        expect(result).toBe(20);
    });
    it('1 hour in Saturday before 9:00', () => {
        const dayOfWeek='SA', startMinutes=60, endMinutes=120;
        const result = getPayByTime(dayOfWeek, startMinutes, endMinutes);
        expect(result).toBe(30);
    });
    it('1 hour in Saturday before 18:00', () => {
        const dayOfWeek='SA', startMinutes=600, endMinutes=660;
        const result = getPayByTime(dayOfWeek, startMinutes, endMinutes);
        expect(result).toBe(20);
    });
    it('1 hour in Saturday before 00:00', () => {
        const dayOfWeek='SA', startMinutes=1200, endMinutes=1260;
        const result = getPayByTime(dayOfWeek, startMinutes, endMinutes);
        expect(result).toBe(25);
    });
    it('2 hours in Tuesday, 1 before 9:00 and 1 after', () => {
        const dayOfWeek='TU', startMinutes=480, endMinutes=601;
        const result = getPayByTime(dayOfWeek, startMinutes, endMinutes);
        expect(result).toBe(40);
    });
    it('2 hours in Tuesday, 1 before 18:00 and 1 after', () => {
        const dayOfWeek='TU', startMinutes=1020, endMinutes=1141;
        const result = getPayByTime(dayOfWeek, startMinutes, endMinutes);
        expect(result).toBe(35);
    });
    it('2 hours in Sunday, 1 before 9:00 and 1 after', () => {
        const dayOfWeek='SU', startMinutes=480, endMinutes=601;
        const result = getPayByTime(dayOfWeek, startMinutes, endMinutes);
        expect(result).toBe(50);
    });
    it('2 hours in Sunday, 1 before 18:00 and 1 after', () => {
        const dayOfWeek='SU', startMinutes=1020, endMinutes=1141;
        const result = getPayByTime(dayOfWeek, startMinutes, endMinutes);
        expect(result).toBe(45);
    });
});

prettify.toHTML(run(), document.getElementById('tests'));