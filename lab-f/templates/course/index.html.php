<?php

/** @var \App\Model\Course[] $courses */
/** @var \App\Service\Router $router */

$title = 'Course List';
$bodyClass = 'index';

ob_start(); ?>
    <h1>Courses List</h1>

    <a href="<?= $router->generatePath('course-create') ?>">Create new</a>

    <ul class="index-list">
        <?php foreach ($courses as $course): ?>
            <li><h3><?= $course->getSubject() ?></h3>
                <ul class="action-list">
                    <li><a href="<?= $router->generatePath('course-show', ['id' => $course->getId()]) ?>">Details</a></li>
                    <li><a href="<?= $router->generatePath('course-edit', ['id' => $course->getId()]) ?>">Edit</a></li>
                </ul>
            </li>
        <?php endforeach; ?>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';