<?php

require_once __DIR__ . '/vendor/autoload.php';

use PHPUnit\Framework\TestCase;

final class PlopfileTest extends TestCase
{
    public $root;

    public function setUp(): void
    {
        file_put_contents(__DIR__ . '/.env', "PLOP_CLIPBOARD=false");

        $this->root = __DIR__ . '/tests';
        $this->assertTrue(empty(shell_exec('composer reset')));
    }

    public function tearDown(): void
    {
        $this->assertTrue(empty(shell_exec('composer reset')));
    }

    public function testBlueprint()
    {
        $file = $this->root . '/site/blueprints/pages/blogpost.yml';
        $this->assertTrue(empty(shell_exec('plop blueprint $ pages blogpost .yml {}')));
        $this->assertFileExists($file);

        $file = $this->root . '/site/blueprints/files/download.php';
        $this->assertTrue(empty(shell_exec('plop blueprint $ files download .php {}')));
        $this->assertFileExists($file);

        $file = $this->root . '/site/blueprints/fields/subfolder/blogpost.yml';
        $this->assertTrue(empty(shell_exec('plop blueprint $ fields subfolder/blogpost .yml {}')));
        $this->assertFileExists($file);
    }

    public function testConfig()
    {
        $file = $this->root . '/site/config/config.php';
        $this->assertTrue(empty(shell_exec('plop config config all {}')));
        $this->assertFileExists($file);

        $this->assertTrue(empty(shell_exec('plop config-hook config page.update:before hooktodo')));
        $this->assertStringContainsString('page.update:before', file_get_contents($file));
        $this->assertStringContainsString('hooktodo', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop config-option config confkey confvalue')));
        $this->assertStringContainsString('confkey', file_get_contents($file));
        $this->assertStringContainsString('confvalue', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop config-route config confpat confpar confmeth confrouodo')));
        $this->assertStringContainsString('confpat', file_get_contents($file));
        $this->assertStringContainsString('confpar', file_get_contents($file));
        $this->assertStringContainsString('confmeth', file_get_contents($file));
        $this->assertStringContainsString('confrouodo', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop language en n ltr en_EN English en {}')));
        $this->assertTrue(empty(shell_exec('plop config-route config confenpat confenpar confenmeth confenrouodo en')));
        $this->assertStringContainsString('confenpat', file_get_contents($file));
        $this->assertStringContainsString('confenpar', file_get_contents($file));
        $this->assertStringContainsString('confenmeth', file_get_contents($file));
        $this->assertStringContainsString('confenrouodo', file_get_contents($file));
    }

    public function testContent()
    {
        $file = $this->root . '/content/blog/consistency-made-simple/blogpost.txt';
        $this->assertTrue(empty(shell_exec('plop content "Consistency made simple!" blog blogpost \'{"Date":"2020-08-03"}\'')));
        $this->assertFileExists($file);
        $this->assertStringContainsString('Date: 2020-08-03', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop language jp n rtl jp_JP Japanese jp {}')));
        $file = $this->root . '/content/blog/consistency-made-great/blogpost.jp.txt';
        $this->assertTrue(empty(shell_exec('plop content "Consistency made great!" blog blogpost \'{"Show":"2020-08-03"}\' jp arigatou')));
        $this->assertFileExists($file);
        $this->assertStringContainsString('Slug: arigatou', file_get_contents($file));
        $this->assertStringContainsString('Show: 2020-08-03', file_get_contents($file));
    }

    public function testController()
    {
        $file = $this->root . '/site/controllers/blogpost.php';
        $this->assertTrue(empty(shell_exec('plop controller $ blogpost .php all')));
        $this->assertFileExists($file);

        $file = $this->root . '/site/controllers/blogpost.qr.php';
        $this->assertTrue(empty(shell_exec('plop controller $ blogpost .qr.php all')));
        $this->assertFileExists($file);
    }

    public function testFile()
    {
        $file = $this->root . '/content/blog/consitency-made-easy/image.png.txt';
        $this->assertTrue(empty(shell_exec('plop file tests/image.png blog/consitency-made-easy hero \'{"sort": 4}\'')));
        $this->assertFileExists($file);
        $this->assertFileExists(str_replace('.txt', '', $file));
        $this->assertStringContainsString('Template: hero', file_get_contents($file));
        $this->assertStringContainsString('Sort: 4', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop language jp n rtl jp_JP Japanese jp {}')));
        $file = $this->root . '/content/blog/something-else/image.png.jp.txt';
        $this->assertTrue(empty(shell_exec('plop file tests/image.png blog/something-else "" {} jp')));
        $this->assertFileExists($file);
        $this->assertFileExists(str_replace('.jp.txt', '', $file));
    }

    public function testLanguage()
    {
        $file = $this->root . '/site/languages/de.php';
        $this->assertTrue(empty(shell_exec('plop language de n ltr de_DE Deutsch de \'{"a": "Ad_e", "b": "Bd_e"}\'')));
        $this->assertFileExists($file);
        $this->assertStringContainsString('ltr', file_get_contents($file));
        $this->assertStringContainsString('de_DE', file_get_contents($file));
        $this->assertStringContainsString('Deutsch', file_get_contents($file));
        $this->assertStringContainsString('Ad_e', file_get_contents($file));
    }

    public function testModel()
    {
        $file = $this->root . '/site/models/blogpost.php';
        $this->assertTrue(empty(shell_exec('plop model $ blogpost all')));
        $this->assertFileExists($file);
    }

    public function testPluginWithExtensions()
    {
        $file = $this->root . '/site/plugins/myplug/index.php';
        $this->assertTrue(empty(shell_exec('plop plugin myname myplug "" all all')));
        $this->assertFileExists($file);
        $this->assertFileExists(str_replace('index.php', 'composer.json', $file));
        $this->assertStringContainsString('myname/myplug', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop ext-auth-challenge myplug authkey authvalue')));
        $this->assertStringContainsString('authkey', file_get_contents($file));
        $this->assertStringContainsString('authvalue', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop ext-api-data myplug adkey adparams adtodo')));
        $this->assertStringContainsString('adkey', file_get_contents($file));
        $this->assertStringContainsString('adparams', file_get_contents($file));
        $this->assertStringContainsString('adtodo', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop ext-api-route myplug arparams arpattern armethod artodo')));
        $this->assertStringContainsString('arparams', file_get_contents($file));
        $this->assertStringContainsString('arpattern', file_get_contents($file));
        $this->assertStringContainsString('armethod', file_get_contents($file));
        $this->assertStringContainsString('artodo', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop blueprint myplug pages hello .yml {}')));
        $this->assertTrue(empty(shell_exec('plop ext-blueprint myplug pages/hello')));
        $this->assertStringContainsString('/blueprints/pages/hello.yml', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop ext-cache-type myplug ctkey ctvalue')));
        $this->assertStringContainsString('ctkey', file_get_contents($file));
        $this->assertStringContainsString('Ctvalue::class', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop ext-class-alias myplug cakey cavalue')));
        $this->assertStringContainsString('class_alias(\'cakey', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop ext-class-loader myplug clkey clvalue')));
        $this->assertStringContainsString('Clkey', file_get_contents($file));
        $this->assertStringContainsString('clvalue.php', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop ext-collection-filter myplug cfkey cftodo')));
        $this->assertStringContainsString('cfkey', file_get_contents($file));
        $this->assertStringContainsString('cftodo', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop ext-collection-method myplug cmkey cmparams cmtodo')));
        $this->assertStringContainsString('cmkey', file_get_contents($file));
        $this->assertStringContainsString('cmparams', file_get_contents($file));
        $this->assertStringContainsString('cmtodo', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop ext-collection myplug clkey clparams cltodo')));
        $this->assertStringContainsString('clkey', file_get_contents($file));
        $this->assertStringContainsString('clparams', file_get_contents($file));
        $this->assertStringContainsString('cltodo', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop controller myplug cooni .php defaults')));
        $this->assertTrue(empty(shell_exec('plop ext-controller myplug cooni')));
        $this->assertStringContainsString('require \'controllers/cooni.php', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop command $ comman all')));
        $this->assertTrue(empty(shell_exec('plop ext-command myplug cdkey cdparams cdtodo')));
        $this->assertStringContainsString('cdkey', file_get_contents($file));
        $this->assertStringContainsString('cdparams', file_get_contents($file));
        $this->assertStringContainsString('cdtodo', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop ext-field-method myplug fmkey fmparams fmtodo')));
        $this->assertStringContainsString('fmkey', file_get_contents($file));
        $this->assertStringContainsString('fmparams', file_get_contents($file));
        $this->assertStringContainsString('fmtodo', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop ext-field myplug fikey fitodo')));
        $this->assertStringContainsString('fikey', file_get_contents($file));
        $this->assertStringContainsString('fitodo', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop ext-file-method myplug fimkey fimparams fimtodo')));
        $this->assertStringContainsString('fimkey', file_get_contents($file));
        $this->assertStringContainsString('fimparams', file_get_contents($file));
        $this->assertStringContainsString('fimtodo', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop ext-files-method myplug fiskey fisparams fistodo')));
        $this->assertStringContainsString('fiskey', file_get_contents($file));
        $this->assertStringContainsString('fisparams', file_get_contents($file));
        $this->assertStringContainsString('fistodo', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop ext-hook myplug page.delete:after hotodo')));
        $this->assertStringContainsString('page.delete:after', file_get_contents($file));
        $this->assertStringContainsString('$status, $page', file_get_contents($file));
        $this->assertStringContainsString('hotodo', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop ext-kirbytag myplug ktkey "ktattr1, ktattr2" ktparams kttodo')));
        $this->assertStringContainsString('ktkey', file_get_contents($file));
        $this->assertStringContainsString('\'ktattr1\'', file_get_contents($file));
        $this->assertStringContainsString('\'ktattr2\'', file_get_contents($file));
        $this->assertStringContainsString('ktparams', file_get_contents($file));
        $this->assertStringContainsString('kttodo', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop ext-option myplug opkey opvalue')));
        $this->assertStringContainsString('opkey', file_get_contents($file));
        $this->assertStringContainsString('opvalue', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop ext-page-method myplug pmkey pmparams pmtodo')));
        $this->assertStringContainsString('pmkey', file_get_contents($file));
        $this->assertStringContainsString('pmparams', file_get_contents($file));
        $this->assertStringContainsString('pmtodo', file_get_contents($file));

        // $this->assertTrue(empty(shell_exec('plop model myplug idefix all')));
        // + class alias
        $this->assertTrue(empty(shell_exec('plop ext-page-model myplug idefix IdefixPage')));
        $this->assertStringContainsString('idefix', file_get_contents($file));
        $this->assertStringContainsString('IdefixPage', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop ext-pages-method myplug pasmkey pasmparams pasmtodo')));
        $this->assertStringContainsString('pasmkey', file_get_contents($file));
        $this->assertStringContainsString('pasmparams', file_get_contents($file));
        $this->assertStringContainsString('pasmtodo', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop ext-pages myplug "Wei rdo!" magician {}')));
        $this->assertStringContainsString('magician', file_get_contents($file));
        $this->assertStringContainsString('Wei rdo!', file_get_contents($file));
        $this->assertStringContainsString('wei-rdo', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop ext-permission myplug pekey pevalue')));
        $this->assertStringContainsString('pekey', file_get_contents($file));
        $this->assertStringContainsString('pevalue', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop ext-route myplug ropattern romethod roparams rotodo')));
        $this->assertStringContainsString('ropattern', file_get_contents($file));
        $this->assertStringContainsString('romethod', file_get_contents($file));
        $this->assertStringContainsString('ropattern', file_get_contents($file));
        $this->assertStringContainsString('rotodo', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop ext-section myplug sekey setodo')));
        $this->assertStringContainsString('sekey', file_get_contents($file));
        $this->assertStringContainsString('setodo', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop ext-site-method myplug simkey simparams simtodo')));
        $this->assertStringContainsString('simkey', file_get_contents($file));
        $this->assertStringContainsString('simparams', file_get_contents($file));
        $this->assertStringContainsString('simtodo', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop snippet myplug asterix all {}')));
        $this->assertTrue(empty(shell_exec('plop ext-snippet myplug asterix')));
        $this->assertStringContainsString('/snippets/asterix.php', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop template myplug obelix .php all')));
        $this->assertTrue(empty(shell_exec('plop ext-template myplug obelix')));
        $this->assertStringContainsString('/templates/obelix.php', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop ext-user-method myplug umkey umparams umtodo')));
        $this->assertStringContainsString('umkey', file_get_contents($file));
        $this->assertStringContainsString('umparams', file_get_contents($file));
        $this->assertStringContainsString('umtodo', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop ext-user-model myplug umokey umovalue')));
        $this->assertStringContainsString('umokey', file_get_contents($file));
        $this->assertStringContainsString('Umovalue', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop ext-users-method myplug umekey umeparams umetodo')));
        $this->assertStringContainsString('umekey', file_get_contents($file));
        $this->assertStringContainsString('umeparams', file_get_contents($file));
        $this->assertStringContainsString('umetodo', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop ext-validator myplug vakey vatodo')));
        $this->assertStringContainsString('vakey', file_get_contents($file));
        $this->assertStringContainsString('vatodo', file_get_contents($file));
    }

    public function testRightReferncesInFullMtcButSameNames() {
        $file = $this->root . '/site/plugins/myplug/index.php';
        $this->assertTrue(empty(shell_exec('plop plugin myname myplug "" all all')));
        $this->assertFileExists($file);

        $this->assertTrue(empty(shell_exec('plop blueprint myplug pages hello .yml {}')));
        $this->assertTrue(empty(shell_exec('plop ext-blueprint myplug pages/hello')));
        $this->assertStringContainsString('/blueprints/pages/hello.yml', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop blueprint myplug fields hello .yml {}')));
        $this->assertTrue(empty(shell_exec('plop ext-blueprint myplug fields/hello')));
        $this->assertStringContainsString('/blueprints/fields/hello.yml', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop model myplug hello all')));
        $this->assertTrue(empty(shell_exec('plop ext-page-model myplug hello helloPage')));
        $this->assertStringContainsString('HelloPage', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop template myplug hello .php all')));
        $this->assertTrue(empty(shell_exec('plop ext-template myplug hello')));
        $this->assertStringContainsString('/templates/hello.php', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop controller myplug hello .php defaults')));
        $this->assertTrue(empty(shell_exec('plop ext-controller myplug hello')));
        $this->assertStringContainsString('require \'controllers/hello.php', file_get_contents($file));

        $this->assertTrue(empty(shell_exec('plop snippet myplug hello all {}')));
        $this->assertTrue(empty(shell_exec('plop ext-snippet myplug hello')));
        $this->assertStringContainsString('/snippets/hello.php', file_get_contents($file));
    }

    public function testSnippet()
    {
        $file = $this->root . '/site/snippets/slideshow.php';
        $this->assertTrue(empty(shell_exec('plop snippet $ slideshow all {}')));
        $this->assertFileExists($file);
    }

    public function testTemplate()
    {
        $file = $this->root . '/site/templates/blogpost.php';
        $this->assertTrue(empty(shell_exec('plop template $ blogpost .php all')));
        $this->assertFileExists($file);

        $file = $this->root . '/site/templates/blogpost.qr.php';
        $this->assertTrue(empty(shell_exec('plop template $ blogpost .qr.php all')));
        $this->assertFileExists($file);
    }

    public function testUser()
    {
        $this->assertTrue(empty(shell_exec('plop user t@test.com myname pw admin en')));
        foreach(glob(__DIR__.'/site/accounts/*/index.php') as $file) {
            $this->assertStringContainsString('myname', file_get_contents($file));
            $this->assertStringContainsString('admin', file_get_contents($file));
            $this->assertStringContainsString('en', file_get_contents($file));
            $this->assertStringStartsWith('$2y', file_get_contents(str_replace('index.php', '.htaccess', $file)));
        }
    }

    public function testTDD()
    {
        $this->markTestSkipped();
    }

    public function testSetup()
    {
        $this->markTestSkipped();
    }

    public function testRobotstxt()
    {
        $this->markTestSkipped();
    }

    public function testHtaccess()
    {
        $this->markTestSkipped();
    }

    public function testDockercompose()
    {
        $this->markTestSkipped();
    }

    public function xtestReadmeExamples()
    {
        $examples = file_get_contents(__DIR__ . '/fixtures.md');
        foreach(explode("\n", $examples) as $ex) {
            if ($ex[0] != '#') {
                $this->assertTrue(empty(shell_exec($ex)));
            }
        }
    }
}
