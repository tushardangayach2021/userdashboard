import _cloneDeep from 'lodash/cloneDeep'
import _get from 'lodash/get'
import _intersection from 'lodash/intersection'
import _isEmpty from 'lodash/isEmpty'
import _trim from 'lodash/trim'

export const isEmpty = _isEmpty // 1 param: and returns a boolean value

export const get = _get // 1st parameter obj and second but now can use es7 ?. for solving issue

export const trim = _trim // takes 2 parameter: first is string, second is trimming, arr trim string

export const cloneDeep = _cloneDeep //parameter: obj, to clone one obj into new one without nay referance

export const intersection = _intersection; // having two or more parameters(arrays) and a array of common elems