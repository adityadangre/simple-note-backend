'use strict';

exports.ok = function (values, res) {
    const data = {
        status: 200,
        data: values
    };

    res.json(data);
    res.end();
};

exports.tes = function (values, values2, res) {
    const data = {
        status: 200,
        data: values,
        total: values2[0],
        page: values2[1],
        totalPage: values2[2],
        limit: values2[3]
    };

    res.json(data);
    res.end();
};