<template>
  <VueExample component="TableGrid" :heroes="heroes" :columns="columns" />
</template>

<script>
export default {
  name: 'Example1',
  data: function () {
    return {
      heroes: [
        { name: 'Chuck Norris', power: Infinity },
        { name: 'Bruce Lee', power: 9000 },
        { name: 'Jackie Chan', power: 7000 },
        { name: 'Jet Li', power: 8000 },
      ],
      columns: ['name', 'power'],
    }
  },
}
</script>
