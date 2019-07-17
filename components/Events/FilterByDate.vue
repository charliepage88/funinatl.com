<template>
  <section class="hero is-small is-success is-bold">
    <div class="hero-body">
      <div class="container">
        <h2 class="subtitle is-5 has-text-centered">
          Choose Time Period
        </h2>

        <div class="columns is-centered">
          <div class="column is-3">
            <b-field label="Start Date" custom-class="has-text-white has-text-centered">
              <b-datepicker
                v-model="start_date"
                icon="calendar-alt"
                icon-pack="fas"
                :mobile-native="false"
                size="is-medium"
                :min-date="minDate"
                :max-date="maxDate"
                :first-day-of-week="1"
                :date-formatter="formatDate"
                @input="changeDate('start_date')"
              />
            </b-field>
          </div>

          <div class="column is-3">
            <b-field label="End Date" custom-class="has-text-white has-text-centered">
              <b-datepicker
                v-model="end_date"
                icon="calendar-alt"
                icon-pack="fas"
                :mobile-native="false"
                size="is-medium"
                :min-date="minDate"
                :max-date="maxDate"
                :first-day-of-week="1"
                :date-formatter="formatDate"
                @input="changeDate('end_date')"
              />
            </b-field>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import moment from 'moment'

export default {
  name: 'filter-by-date',

  data () {
    return {
      start_date: null,
      end_date: null,
      minDate: moment().startOf('day').toDate(),
      maxDate: moment().add(2, 'month').toDate()
    }
  },

  methods: {
    formatDate (date) {
      return moment(date).format('YYYY-MM-DD')
    },

    changeDate (key) {
      this.$emit('change', key, this[key])
    }
  }
}
</script>