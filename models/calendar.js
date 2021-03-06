import angular from 'angular'
import moment from 'moment'
import { forEach, sortBy, sortedLastIndexBy } from 'lodash'

import yml from './calendar.yml'

const calendar = forEach(sortBy(yml, 'day'), (day) => {
  day.date = new Date(day.day)
  day.budget = day.budget || 'https://docs.google.com/spreadsheets/d/1D3_RS7sMBZZxJRSmrTM_3Rf0ZyTfD3ApbftW8TwZ468/edit'
  forEach(day.schedule, (event) => {
    forEach(event, (item, time) => {
      // expand shorthand
      if (typeof(item) === 'string')
        event[time] = { title: item }
    })
  })
})

Object.defineProperty(calendar, 'on', {
  value: function(day) {
    const yesterday = { day: moment(day).subtract(1, 'day').format('YYYY-MM-DD') }
    const index = sortedLastIndexBy(this, yesterday, 'day')
    return this[index]
  }
})

module.exports = angular.module('wafflejs.models.calendar', [])
.constant('calendar', calendar)
.name
