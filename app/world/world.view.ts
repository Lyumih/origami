namespace $.$$ {
	export class $origami_app_world extends $.$origami_app_world {

		@ $mol_mem
		banks_data() {
			const result = this.$.$origami_app_bank.fetch_banks_data(10)
			console.log(result)
			return result
		}

		bank_id( id: string ) {
			return this.banks_data().find( ( bank ) => bank.id == id )
		}

		center(next? : $mol_vector_2d<number> | readonly[number,number] , force? : $mol_mem_force ): $mol_vector_2d<number> | readonly[number,number] {
			const bank_id = this.$.$mol_state_arg.value('bank' )
			console.log(bank_id)
			if (bank_id) {
				const central_bank = this.bank_id(bank_id)
				console.log('central_bank', central_bank)
				return [central_bank?.latitude || 0, central_bank?.longitude || 0]
			}

			return [55.754742, 37.621407]
		}

		banks_mark_list() {
			console.log('banks_mark')
			return this.banks_data().map( bank => this.Place(bank.id))
		}

		mark_pos( id?: string, next?: $mol_vector_2d<number> | readonly[number,number] ): $mol_vector_2d<number> | readonly[number,number] {
			const bank = this.bank_id( id || '' )
			return new $mol_vector_2d( bank?.latitude || 0, bank?.longitude || 0 )
		}
	}
}
