import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RotinaService } from '../../services/domain/rotina.service';

@IonicPage()
@Component({
  selector: 'page-cadastro-rotina',
  templateUrl: 'cadastro-rotina.html',
})
export class CadastroRotinaPage {

  formGroup: FormGroup;

  crianca_id = this.navParams.get("crianca_id");
  crianca_nome = this.navParams.get("crianca_nome");

  setData() {

    let data = new Date().toLocaleString('pt-BR')

    return data;
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public rotinaService: RotinaService) {

    this.formGroup = this.formBuilder.group({
      crianca: [{ "id": this.crianca_id }, [Validators.required]],
      dataCriacao: [this.setData(), [Validators.required]],
      data: [this.setData(), [Validators.required]],
      atividades: ['Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet'],
      obs: ['teste'],
      tipo: [1, [Validators.required]],
      comportamento: [2, [Validators.required]],
      interacao: [2, [Validators.required]],
      humor: [2, [Validators.required]],
      alimentacao: [2, [Validators.required]]
    })

  }

  ionViewDidLoad() {
    console.log(this.setData());  }

  novaRotina() {
    this.rotinaService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk()
      }, error => { })

  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso!',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot('RotinasPage', { crianca_id: this.crianca_id, crianca_nome: this.crianca_nome });
          }
        }
      ]
    });
    alert.present();
  }

}