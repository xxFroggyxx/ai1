<?php
/** @var $course ?\App\Model\Course */
?>

<div class="form-group">
    <label for="subject">Subject</label>
    <input type="text" id="subject" name="course[subject]" value="<?= $course ? $course->getSubject() : '' ?>">
</div>

<div class="form-group">
    <label for="content">Content</label>
    <textarea id="content" name="course[content]"><?= $course? $course->getContent() : '' ?></textarea>
</div>

<div class="form-group">
    <label for="date">Date</label>
    <input type="date" id="date" name="course[date]" value="<?= $course ? $course->getDate() : '' ?>">
</div>

<div class="form-group">
    <label></label>
    <input type="submit" value="Submit">
</div>