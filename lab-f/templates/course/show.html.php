<?php

/** @var \App\Model\Course $course */
/** @var \App\Service\Router $router */

$title = "{$course->getSubject()} ({$course->getId()})";
$bodyClass = 'show';

ob_start(); ?>
    <h1><?= $course->getSubject() ?></h1>
    <article>
        <?= $course->getContent();?>
    </article>
    <h3><?= $course->getDate() ?></h3>
    <ul class="action-list">
        <li> <a href="<?= $router->generatePath('course-index') ?>">Back to Courses</a></li>
        <li><a href="<?= $router->generatePath('course-edit', ['id'=> $course->getId()]) ?>">Edit</a></li>
    </ul>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';