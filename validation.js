export default {
  errors: {},
  validate() {
    const form = document.getElementsByClassName('form-validate');

    form[0].addEventListener('submit', (event) => {
      const elements = document.querySelectorAll('.form-validate [data-rules]');

      elements.forEach((element) => {
        const elementRules = element.getAttribute('data-rules');
        const rules = elementRules ? elementRules.split('|') : [];
        const attributes = this.getElementAttributes(element);
        if (rules.length) {
          rules.forEach((rule) => {
            if (typeof this[rule] !== 'undefined') {
              this[rule](element, attributes);
            }
          });
        }
      });
      if (Object.values(this.errors).length) {
        event.preventDefault();
      }
    });
  },
  required(element, attributes) {
    if (!attributes.value) {
      this.errors[attributes.name] = `${attributes.name} field is required.`;
    } else if (attributes.type === 'checkbox' || attributes.type === 'radio') {
      this.checkbox(element, attributes);
    } else {
      delete this.errors[attributes.name];
    }
  },
  email(element, { name, value }) {
    const regex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/;
    if (value && !regex.test(String(value).toLowerCase())) {
      this.errors[name] = `The ${name} must be a valid email address.`;
    }
  },
  numeric(element, { name, value }) {
    if (value && !(/^\d*$/.test(value))) {
      this.errors[name] = `The ${name} must be a number.`;
    }
  },
  confirmed(element, { name, value }) {
    const confirmAttr = element.getAttribute('data-confirmed') || `${name}_confirmation`;
    const confirmElement = document.querySelector(`[data-name=${confirmAttr}]`);

    if (value && confirmElement && value !== confirmElement.value && !this.errors[name]) {
      this.errors[name] = `The ${name} confirmation does not match.`;
    }
  },
  max(element, { name, value }) {
    const maxVal = element.getAttribute('data-max');

    if (value && maxVal && value.length > maxVal) {
      this.errors[name] = `The ${name} may not be greater than ${maxVal}.`;
    }
  },
  min(element, { name, value }) {
    const minVal = element.getAttribute('data-min');

    if (value && minVal && value.length < minVal) {
      this.errors[name] = `The ${name} must be at least ${minVal}.`;
    }
  },
  between(element, { name, value }) {
    const dataBetween = element.getAttribute('data-between');
    const between = dataBetween ? dataBetween.split(',') : [];

    if (value && between.length > 1) {
      if ((value.length < between[0] || value.length > between[1]) || !this.errors[name]) {
        this.errors[name] = `The ${name} must be between ${between[0]} and ${between[1]} digits.`;
      }
    }
  },
  checkbox(element, { name }) {
    if (!element.checked) {
      this.errors[name] = `${name} field is required.`;
    } else {
      delete this.errors[name];
    }
  },
  getElementAttributes(element) {
    return {
      name: element.getAttribute('data-name'),
      value: element.value,
      type: element.getAttribute('type'),
    };
  },
  init() {
    this.validate();
  },
};
