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
                size="is-medium"
                :min-date="minDate"
                :max-date="maxDate"
                :first-day-of-week="1"
                :date-formatter="formatDate"
                @input="changeDate('start_date')"
                :mobile-native="true"
                aria-label="Start date"
              />
            </b-field>
          </div>

          <div class="column is-3">
            <b-field label="End Date" custom-class="has-text-white has-text-centered">
              <b-datepicker
                v-model="end_date"
                icon="calendar-alt"
                icon-pack="fas"
                size="is-medium"
                :min-date="minDate"
                :max-date="maxDate"
                :first-day-of-week="1"
                :date-formatter="formatDate"
                @input="changeDate('end_date')"
                :mobile-native="true"
                aria-label="End date"
              />
            </b-field>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'

export default {
  name: 'filter-by-date',

  data () {
    return {
      start_date: moment().startOf('day').toDate(),
      end_date: moment().add(10, 'day').toDate(),
      minDate: moment().startOf('day').toDate(),
      maxDate: moment().add(2, 'month').toDate()
    }
  },

  methods: {
    ...mapActions('site', [
      'startLoading',
      'stopLoading'
    ]),

    formatDate (date) {
      return moment(date).format('YYYY-MM-DD')
    },

    changeDate (key) {
      this.startLoading()

      setTimeout(() => this.stopLoading(), 1500)

      this.$emit('change', key, this[key])
    }
  }
}
</script>