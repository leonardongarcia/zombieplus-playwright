
import { test } from '../support';
import { faker } from '@faker-js/faker';

import { Toast } from '../pages/Components';
// ==========================================================================================================================================================================
// AULA 24 - PAGE OBJECTS NA PRÁTICA

test('deve cadastrar um lead na fila de espera', async ({ page }) => {

  const leadName = faker.person.fullName(); // Rowan Nikolaus
  const leadEmail = faker.internet.email();
  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm(leadName, leadEmail);
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'

  await page.toast.containText(message)
});

test('não deve cadastrar quando o email já existe', async ({ page, request }) => {

  const leadName = faker.person.fullName(); // Rowan Nikolaus
  const leadEmail = faker.internet.email();

  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })

  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm(leadName, leadEmail);

  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'

  await page.toast.containText(message)
});


test('não deve cadastrar com email incorreto', async ({ page }) => {
  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm('Leonardo', 'leonardon');
  await page.landing.alertHaveText('Email incorreto')
});



test('não deve cadastrar com nome não preenchido', async ({ page }) => {
  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm('', 'leonardo@yahoo.com.br');
  await page.landing.alertHaveText('Campo obrigatório');
});

test('não deve cadastrar com email não preenchido', async ({ page }) => {
  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm('Leonardo Garcia', '');
  await page.landing.alertHaveText('Campo obrigatório');
});

test('não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm('', '');
  await page.landing.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ]);
});

