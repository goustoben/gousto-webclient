function logJourneyStep(journeyStepDescription) {
  this.perform(() => {
    console.log(`********************* ${journeyStepDescription} *********************`)
  })

  return this
}

exports.command = logJourneyStep
