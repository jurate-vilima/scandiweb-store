<?php
use PhpCsFixer\Config;
use PhpCsFixer\Finder;

$finder = Finder::create()
    ->in(__DIR__ . '/src')
    ->in(__DIR__ . '/config')
    ->in(__DIR__ . '/public')
    ->name('*.php')
    ->exclude('vendor');

return (new Config())
    ->setRiskyAllowed(true)
    ->setIndent('    ') 
    ->setLineEnding("\n")
    ->setRules([
        '@PSR12' => true,
        '@PhpCsFixer' => true, 

        'array_syntax' => ['syntax' => 'short'],           
        'binary_operator_spaces' => ['default' => 'align'], 
        'blank_line_after_namespace' => true,
        'blank_line_after_opening_tag' => true,
        'cast_spaces' => ['space' => 'single'],
        'concat_space' => ['spacing' => 'one'],            
        'no_superfluous_phpdoc_tags' => true,
        'phpdoc_align' => ['align' => 'left'],
        'phpdoc_separation' => true,
        'phpdoc_summary' => false,
        'phpdoc_trim' => true,
        'phpdoc_trim_consecutive_blank_line_separation' => true,
        'ordered_imports' => ['sort_algorithm' => 'alpha'], 
        'no_unused_imports' => true,                        
        'single_quote' => true,                            
        'ternary_operator_spaces' => true,
        'trailing_comma_in_multiline' => ['elements' => ['arrays']],
        'types_spaces' => ['space' => 'single'],
    ])
    ->setFinder($finder);
