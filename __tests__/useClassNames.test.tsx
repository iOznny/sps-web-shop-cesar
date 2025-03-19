import useClassNames from "../app/hooks/useClassNames";

describe('useClassNames', () => {
    test('test run unit testing', () => {
        const className = ['class1', 'class2'];
        expect(className[0]).toBe('class1');
    });

    test('should join class names correctly', () => {
        const classNames = useClassNames();
        
        expect(classNames('class1', 'class2')).toBe('class1 class2');
    });

    test('should filter out falsy values', () => {
        const classNames = useClassNames();
        expect(classNames('class1', '', 'class2')).toBe('class1 class2');
    });

    test('should return empty string when no classes provided', () => {
        const classNames = useClassNames();
        
        expect(classNames()).toBe('');
    });
});