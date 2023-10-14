namespace $.$$ {
	export class $origami_app_bank extends $.$origami_app_bank {

		@$mol_mem
		static fetch_banks_data( limit?: number ) {
			const result = this.$.$mol_fetch
				.json( `https://origami-team.site/office/all?offset=0&limit=${ limit || 50 }` ) as {
					id: string,
					salePointName?: string,
					address: string,
					type?: string,
					distance?: number,
					longitude?: number,
					latitude?: number,
					workload_type?: number,
					openHoursIndividual?: [],
					openHours?: { day: string, hours: null | string }[],
				}[]
			console.log( result )
			return result.sort( ( a, b ) => Number( a.distance ) > Number( b.distance ) ? 1 : -1 )
		}

		@$mol_mem
		banks_data() {
			console.log( 'get_data_banks' )
			return this.$.$origami_app_bank.fetch_banks_data()
		}

		@$mol_mem
		banks() {
			if( !this.filter_type() ) return this.banks_data()
			return this.banks_data().filter( bank => {
				const dates = this.filter_type() === 'ind' ? bank.openHoursIndividual : bank.openHours
				return dates && dates[ 0 ]?.hours
			} )
		}

		bank_id( id: string ) {
			return this.banks().find( ( bank ) => bank.id == id )
		}

		bank_list(): readonly any[] {
			return this.banks().map( ( bank ) => this.Bank( bank.id ) )
		}

		bank_name( id: any ): string {
			return this.bank_id( id )?.salePointName || ''
		}

		bank_address( id: any ): string {
			return this.bank_id( id )?.address || ''
		}

		bank_distance( id: any ) {
			const distance = this.bank_id( id )?.distance
			if( !distance ) return ''
			else if( distance > 1000 ) { return `${ ( distance / 1000 ).toFixed( 1 ) } км` }
			else { return `${ distance } м` }
		}

		bank_time( id: any ): string {
			const day = new Date().getDay() - 1
			return this.bank_id( id )?.openHours?.[ day ]?.hours ?? 'Выходной'
		}

		bank_workload( id: any ) {
			return this.bank_id( id )?.workload_type || 0
		}

		@$mol_action
		open_map( id: string, next?: any ) {
			const bank = this.bank_id( id )
			console.log( next, bank )
			this.$.$mol_state_arg.go( { 'page': 'map', bank: bank?.id || '' } )
		}
	}
}
