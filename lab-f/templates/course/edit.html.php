<?php

/** @var \App\Model\Course $course */
/** @var \App\Service\Router $router */

$title = "Edit course {$course->getSubject()} ({$course->getId()})";
$bodyClass = "edit";

ob_start(); ?>
    <h1><?= $title ?></h1>
    <form action="<?= $router->generatePath('course-edit') ?>" method="post" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="course-edit">
        <input type="hidden" name="id" value="<?= $course->getId() ?>">
    </form>

    <ul class="action-list">
        <li>
            <a href="<?= $router->generatePath('course-index') ?>">Back to courses</a></li>
        <li>
            <form action="<?= $router->generatePath('course-delete') ?>" method="post">
                <input type="submit" value="Delete" onclick="return confirm('Are you sure?')">
                <input type="hidden" name="action" value="course-delete">
                <input type="hidden" name="id" value="<?= $course->getId() ?>">
            </form>
        </li>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';