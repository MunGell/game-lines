var mq = {
    'all': 'all',
    'mobile': 'all',
    'mobileOnly': '(max-width: 740px)',
    'tablet': 'all and (min-width: 740px) and (min-device-width: 740px), (max-device-width: 800px) and (min-width: 740px) and (orientation:landscape)',
    'tabletOnly': '(min-width: 740px) and (min-device-width: 740px) and (max-width: 980px), (max-device-width: 800px) and (min-width: 740px) and (orientation:landscape)',
    'normal': 'all and (min-width: 980px) and (min-device-width: 980px), all and (max-device-width: 1024px) and (min-width: 1024px) and (orientation:landscape)',
    'normalOnly': '(min-width: 980px) and (min-device-width: 980px) and (max-width: 1220px), (max-device-width: 1024px) and (min-width: 1024px) and (orientation:landscape)',
    'wide': 'all and (min-width: 1220px)'
};