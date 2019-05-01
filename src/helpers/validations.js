
const Validate = (validation, data) => {
    let errors = {};

    for (var k in validation) {
        let validations = validation[k].split('|');
        const value = data[k];
        validations.map(item => {
            switch( item ) {
                case 'required':
                    if ( !value ) {
                        errors[k] = 'This field is required';
                    }
                    break;
                case 'email':
                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(value))  {
                        errors[k] = 'Please enter an email address';
                    }
            }
        });
    }

    return errors;

}

export default Validate;