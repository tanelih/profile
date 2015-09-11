/**
 * Check the object has the given property
 */
export const has = (obj, key) => obj.hasOwnProperty(key)

/**
 * Get the object keys & values.
 */
export const keys   = obj => Object.keys(obj)
export const values = obj => Object.keys(obj).map(key => obj[key])

/**
 * Reduce the given array.
 */
export const reduce = (arr, fn, init = { }) => arr.reduce(fn, init)

/**
 * Assign the given 'src' objects into an empty, new object
 */
export const assign = (...src) => Object.assign({ }, ...src)

/**
 * Map object properties according to the given 'map'.
 */
export const mapProperties = map => obj => {
	// run a reducer for the object keys, omitting any keys that are not in the
	// given property map
	return reduce(keys(obj), (result, key) => {
		// don't include keys that are not in the property map
		if(!has(map, key)) return result

		// merge the reduction with the existing object, while making sure that
		// we can have nested objects in our property maps
		return assign(result, typeof map[key] === 'object'
			? assign({
				// the map value for this key is an object, so we recursively
				// use the object as a 'map' for the corresponding values
				[ key ]: mapProperties(map[key])(obj[key])
			})
			: assign({
				// otherwise we'll just do a simple mapping, where we use the
				// property map 'value' at the 'key' as the new key for the
				// corresponding value
				[ map[key] ]: obj[key]
			}))
	})
}
