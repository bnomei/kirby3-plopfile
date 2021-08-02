<?php

require_once __DIR__ . '/vendor/autoload.php';

use PHPUnit\Framework\TestCase;
use SebastianBergmann\CodeCoverage\Report\PHP;

final class PlopfileTest extends TestCase
{
    public $dotenv;
    public $root;

    public function setUp(): void
    {
        $this->dotenv = file_get_contents(__DIR__ . '/.env');
        file_put_contents(__DIR__ . '/.env', "PLOP_CLIPBOARD=false");

        $this->root = __DIR__ . '/tests';
    }

    public function tearDown(): void
    {
        file_put_contents(__DIR__ . '/.env', $this->dotenv);
    }

    public function testReadmeExamples()
    {
        $this->assertTrue(exec('composer reset') != false);

        $examples = file_get_contents(__DIR__ . '/examples.md');
        foreach(explode("\n", $examples) as $ex) {
            if ($ex[0] != '#') {
                $this->assertTrue(empty(shell_exec($ex)));
            }
        }

        $this->assertTrue(exec('composer reset') != false);
    }

    public function testConfig()
    {
        $this->assertTrue(empty(shell_exec('plop config config all {}')));
        $this->assertFileExists($this->root . '/site/config/config.php');
    }    
}