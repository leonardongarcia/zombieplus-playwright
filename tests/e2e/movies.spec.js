import { test } from "../support";

const data = require('../support/fixtures/movies.json')

import { executeSQL } from "../support/database";

test('deve poder cadastrar um novo filme', async ({ page }) => {
    // é importante estar logado

    const movie = data.create

    await executeSQL(`delete from movies where title = '${movie.title}';`)

    await page.login.visit();
    await page.login.submit('admin@zombieplus.com', 'pwd123');
    await page.movies.isLoggedIn();
    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year)

    await page.toast.containText('Cadastro realizado com sucesso!')
})