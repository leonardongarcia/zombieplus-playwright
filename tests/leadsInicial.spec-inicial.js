// @ts-check
import { test, expect } from '@playwright/test';

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // busca pelo XPath
  // await page.click('//button[text()="Aperte o play... se tiver coragem"]');
  
  // texto exato
  // await page.getByRole('button', {name: "Aperte o play... se tiver coragem"}).click(); 

  // texto parcial
  await page.getByRole('button', {name: /Aperte o play/}).click();

  // await page.waitForTimeout(10000);

  // ==========================================================================================================================================================================
  // aula 18 checkpoints e técnicas de busca de elementos
  
  //getByTestId só funciona quando tem a tag data-test=""
  // await page.getByTestId('name').fill('leonardo@yahoo.com.br');
  
  // locator é genérico, buscando por ID nesse caso
  // await page.locator('#name').fill('leonardo@yahoo.com.br');
  
  //
  // await page.locator('ELEMENTO[PROP=VALUE]').fill('leonardo@yahoo.com.br');
  // await page.locator('input[name=name]').fill('leonardo@yahoo.com.br');
  
  // await page.locator('input[placeholder="Seu nome completo"]').fill('leonardo@yahoo.com.br');
  
  //técnica de checkpoint
  
  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera');
  
  await page.getByPlaceholder('Informe seu nome').fill('Leonardo n Garcia');
  await page.getByPlaceholder('Informe seu email').fill('leonardon@yahoo.com.br');
  
  // ==========================================================================================================================================================================
  // aula 19 - Clicando em botões
  
  //primeiro há a verificação do texto do botão apenas dentro do modal buscado primeiramente.
  await page.getByTestId('modal')
  .getByText('Quero entrar na fila!').click();
  
  // ==========================================================================================================================================================================
  // AULA 20 - ELEMENTOS FLUTUANTES
  
  // await page.getByText('seus dados conosco').click();
  // const content = await page.content();
  // console.log(content);
  
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await expect(page.locator('.toast')).toHaveText(message);
  
  await expect(page.locator('.toast')).toBeHidden({timeout: 5000});
  // await page.waitForTimeout(5000);
});

// ==========================================================================================================================================================================
// AULA 21 - INTERAGINDO COM ALERTS

test('não deve cadastrar com email incorreto', async ({ page }) => {
  
  await page.goto('http://localhost:3000/');
  
  await page.getByRole('button', {name: /Aperte o play/}).click();
  
  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera');
  
  await page.getByPlaceholder('Informe seu nome').fill('Leonardo n Garcia');
  await page.getByPlaceholder('Informe seu email').fill('leonardon');
  
  await page.getByTestId('modal')
  .getByText('Quero entrar na fila!').click();
  
  await expect(page.locator('.alert')).toHaveText('Email incorreto');
});


// ==========================================================================================================================================================================
//AULA 22 - VALIDANDO O COMPORTAMENTO ESPERADO
test('não deve cadastrar com nome não preenchido', async ({ page }) => {
  
  await page.goto('http://localhost:3000/');
  
  await page.getByRole('button', {name: /Aperte o play/}).click();
  
  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera');
  
  await page.getByPlaceholder('Informe seu email').fill('leonardo@yahoo.com.br');
  
  await page.getByTestId('modal')
  .getByText('Quero entrar na fila!').click();
  
  await expect(page.locator('.alert')).toHaveText('Campo obrigatório');
});

test('não deve cadastrar com email não preenchido', async ({ page }) => {
  
  await page.goto('http://localhost:3000/');
  
  await page.getByRole('button', {name: /Aperte o play/}).click();
  
  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera');
  
  await page.getByPlaceholder('Informe seu nome').fill('Leonardo n Garcia');
  
  await page.getByTestId('modal')
  .getByText('Quero entrar na fila!').click();
  
  await expect(page.locator('.alert')).toHaveText('Campo obrigatório');
});

test('não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
  
  await page.goto('http://localhost:3000/');
  
  await page.getByRole('button', {name: /Aperte o play/}).click();
  
  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera');
  
  await page.getByTestId('modal')
  .getByText('Quero entrar na fila!').click();
  
  await expect(page.locator('.alert')).toHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ]);
});

// ==========================================================================================================================================================================
// AULA 23 - ELEMENTOS DE PÁGINA SOLTA

// Houve atualização da versão do software e houve quebra dos testes de regressão. Após atualizar os placeholdes, os teste voltaram a passar!

// ==========================================================================================================================================================================
// AULA 24 - PAGE OBJECTS NA PRÁTICA