namespace $.$$ {
	export class $origami_app_world extends $.$origami_app_world {

		@ $mol_mem
		banks_data() {
			const result = this.$.$origami_app_bank.fetch_banks_data(100)
			console.log(result)
			return result
		}

		bank_id( id: string ) {
			return this.banks_data().find( ( bank ) => bank.id == id )
		}

		center(): $mol_vector_2d<number> {
			const bank_id = this.$.$mol_state_arg.value('bank' ) || this.$.$mol_state_arg.value('bank_solo' )
			console.log(bank_id)
			if (bank_id) {
				const central_bank = this.bank_id(bank_id)
				console.log('central_bank', central_bank)
				return new $mol_vector_2d(central_bank?.latitude || 0, central_bank?.longitude || 0)
			}

			return new $mol_vector_2d(55.754742, 37.621407)
		}

		banks_mark_list() {
			console.log('banks_mark')
			return this.banks_data().map( bank => this.Place(bank.id))
		}

		mark_pos( id: any ): $mol_vector_2d<number> {
			const bank = this.bank_id( id || '' )
			return new $mol_vector_2d( bank?.latitude || 0, bank?.longitude || 0 )
		}

		place_address( id: any ): string {
			return this.bank_id( id )?.address || ''
		}

		place_content( id: any ): string {
			const bank = this.bank_id( id )
			if (!bank) return 'Не найдено информации'
			const workload = this.bank_id( id )?.workload_type || 0
			const workload_text = 'Загруженность банка: <b>' + (workload === 0 ? 'слабая' : workload === 1 ? 'средняя' : 'высокая') + '</b>'
			const name = this.bank_id( id )?.salePointName
			return workload_text + '<br>' + name + '<br>Нажмите <b>"Как добраться"</b> чтобы проложить маршрут'
		}
	}
}
