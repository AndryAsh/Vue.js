import MyCalculator from '../components/MyCalculator.vue';
import { mount } from '@vue/test-utils';

describe('Test Calculator', () => {
    // Тест operan1
    it('Test first operand', () => {
        const wrapper = mount(MyCalculator);

        const operand1 = wrapper.find('input[name=operand1]');
        operand1.setValue('1');
        expect(wrapper.vm.operand1).toBe(1);
    });

    // Тест operand2
    it('Test second operand', () => {
        const wrapper = mount(MyCalculator);

        const operand2 = wrapper.find('input[name=operand2]');
        operand2.setValue('5');
        expect(wrapper.vm.operand2).toBe(5);
    });

    // Тест метода Sum
    it('Test Sum()', () => {
        const wrapper = mount(MyCalculator);

        const operand1 = wrapper.find('input[name="operand1"]');
        operand1.element.value = '1';
        operand1.trigger('input');

        const operand2 = wrapper.find('input[name="operand2"]');
        operand2.setValue('3');
        const buttonSum = wrapper.find('button[name="+"]');
        buttonSum.trigger('click');

        expect(wrapper.vm.result).toBe(4);
    });

    // Тест метода Diff
    it('Test Diff()', () => {
        const wrapper = mount(MyCalculator);

        const operand1 = wrapper.find('input[name="operand1"]');
        operand1.element.value = '5';
        operand1.trigger('input');

        const operand2 = wrapper.find('input[name="operand2"]');
        operand2.setValue('3');
        const buttonDiff = wrapper.find('button[name="-"]');
        buttonDiff.trigger('click');

        expect(wrapper.vm.result).toBe(2);
    });

    // Тест метода Multiply
    it('Test Multiply()', () => {
        const wrapper = mount(MyCalculator);

        const operand1 = wrapper.find('input[name="operand1"]');
        operand1.element.value = '5';
        operand1.trigger('input');

        const operand2 = wrapper.find('input[name="operand2"]');
        operand2.setValue('3');
        const buttonMultiply = wrapper.find('button[name="*"]');
        buttonMultiply.trigger('click');

        expect(wrapper.vm.result).toBe(15);
    });

    // Тест метода Divide
    it('Test Divide()', async () => {
        const wrapper = mount(MyCalculator);

        await wrapper.find('input[name="operand1"]').setValue(8);

        await wrapper.find('input[name="operand2"]').setValue(2);

        await wrapper.find('button[name="/"]').trigger('click');

        expect(wrapper.vm.result).toBe(4);
    });

    // Тест метода Degree
    it('Test Degree()', () => {
        const wrapper = mount(MyCalculator);

        const operand1 = wrapper.find('input[name="operand1"]');
        operand1.element.value = '4';
        operand1.trigger('input');

        const operand2 = wrapper.find('input[name="operand2"]');
        operand2.element.value = '2';
        operand2.trigger('input');

        const buttonDegree = wrapper.find('button[name="^"]');
        buttonDegree.trigger('click');

        expect(wrapper.vm.result).toBe(16);
    });

    // Тест метода intDivide
    it('Test intDivide()', async () => {
        const wrapper = mount(MyCalculator);

        await wrapper.find('input[name="operand1"]').setValue(8);
        const operand2 = await wrapper.find('input[name="operand2"]').setValue(2);

        /* wrapper.vm.$nextTick(); */

        await wrapper.find('button[name="int"]').trigger('click');

        expect(wrapper.vm.result).toBe(4);
    });

    // Тест выбора чекбокса и отрисовки экранной клавиатуры
    it('Test checkbox and visible virtual keyboard', async () => {
        const wrapper = mount(MyCalculator);
        /* const operand1 = wrapper.find('input[name="operand1"]'); */
        /* const operand2 = wrapper.find('input[name="operand2"]'); */

        // Проверяем что чекбокс не активен
        const checkBox = wrapper.find('input[name="checkbox-keyboard"]');
        expect(checkBox.element.checked).toBe(false);

        // Проверяем что клавиатура не видна
        const vKeyboard = wrapper.find('.keyboard');
        expect(vKeyboard.element).not.toBeVisible;

        // Устанавливаем чекбокс
        await checkBox.setChecked(true);
        expect(checkBox.element.checked).toBe(true);

        // Проверяем что клавиатура видна
        await expect(vKeyboard.element).toBeVisible;

        // Проверяем радиокнопки переключения операндов и клавиши клавиатуры
        // Первый чекбокс активен
        const radioButton1 = wrapper.find('input[id="operand1"]');
        expect(wrapper.vm.radioOperand1).toBe(true);

        // Второй чекбокс не активен
        const radioButton2 = wrapper.find('input[id="operand2"]');
        expect(wrapper.vm.radioOperand2).toBe(false);

        // Нажали все цифровые кнопки клавиатуры
        for (let i = 1; i <= 9; i++) {
            wrapper.find(`button[name="${i}"]`).trigger('click');
        }
        // Проверяем значение operand1
        await expect(wrapper.vm.operand1).toBe(123456789);

        // Находим кнопку backspace
        const backspace = wrapper.find('button[name="backspace"]');
        // Кликаем по ней 9 раз
        for (let i = 1; i <= 9; i++) {
            backspace.trigger('click');
        }
        // Проверяем значение operand1
        await expect(wrapper.vm.operand1).toBe(0);

        // Выбираем вторую радиокнопку
        await radioButton2.setChecked();
        // Проверяем что вторая радиокнопка активна
        await expect(wrapper.vm.picked).toBe('radio2');
        await expect(wrapper.vm.radioOperand2).toBe(true);

        // проверяем что первая радиокнопка деактивирована
        await expect(wrapper.vm.radioOperand1).toBe(false);

        // Нажали все цифровые кнопки клавиатуры
        for (let i = 1; i <= 9; i++) {
            wrapper.find(`button[name="${i}"]`).trigger('click');
        }
        // Проверяем значение operand1
        await expect(wrapper.vm.operand2).toBe(123456789);

        // Проверяем работу кнопки bacspace
        for (let i = 1; i <= 9; i++) {
            backspace.trigger('click');
        }
        // Проверяем значение operand1
        await expect(wrapper.vm.operand2).toBe(0);

        // Переключаемся на первую радиокнопку
        await radioButton1.setChecked();
        // Проверяем что вторая радиокнопка активна
        await expect(wrapper.vm.picked).toBe('radio1');
        await expect(wrapper.vm.radioOperand1).toBe(true);

        // проверяем что dnjhfz радиокнопка деактивирована
        await expect(wrapper.vm.radioOperand2).toBe(false);
    });
})

