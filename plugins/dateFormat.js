import Vue from 'vue';

Vue.filter('dateFormat', function (value, time) {
    if (!value) return '';
    value = value.toString();
    const date = new Date(value);
    let options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour12: false,
        timezone: 'Europe/Amsterdam'
    };
    if (time) {
        options.hour = 'numeric';
        options.minute = 'numeric';
    }
    return new Intl.DateTimeFormat('nl-NL', options).format(date);
});